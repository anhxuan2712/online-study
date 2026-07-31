package com.dan.repository;

import com.dan.model.Course;
import com.dan.model.Lession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessionRepository extends JpaRepository<Lession, Long>{
    @Query("SELECT l FROM Lession l WHERE CONCAT(l.name, ' ', l.description) LIKE %:keyword%")
    Page<Lession> searchByKeyword(String keyword, Pageable pageable);
//    @Query("SELECT l FROM Lession l WHERE l.publicDocument = true")
//    Page<Lession> findPublic_Document(Pageable pageable);
    Page<Lession> findByPublicDocument(boolean publicDocument, Pageable pageable);
    List<Lession> findByCourse(Course course);
}
